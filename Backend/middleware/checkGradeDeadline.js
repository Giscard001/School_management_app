const ErrorResponse = require('../utils/errorResponse');
const Setting = require('../models/Setting');
const UnlockRequest = require('../models/UnlockRequest');

/**
 * Middleware pour vérifier si la saisie de notes est autorisée pour une période donnée
 * Vérifie la date limite et le statut de verrouillage
 */
exports.checkGradeDeadline = async (req, res, next) => {
    try {
        // Récupérer la période depuis le body
        const { periode, classe, matiere } = req.body;

        console.log('🔍 [checkGradeDeadline] Vérification deadline pour:', { periode, classe, matiere, user: req.user?.email });

        if (!periode) {
            console.log('⚠️ [checkGradeDeadline] Pas de période fournie, autorisation par défaut');
            return next();
        }

        // Vérifier si le professeur a une demande de déblocage approuvée
        if (req.user.role === 'PROFESSEUR' && classe && matiere) {
            const approvedRequest = await UnlockRequest.findOne({
                professeur: req.user.id,
                classe: classe,
                matiere: matiere,
                periode: periode,
                statut: 'APPROUVEE',
                // Vérifier que l'approbation est récente (7 jours)
                dateTraitement: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
            });

            if (approvedRequest) {
                console.log('✅ [checkGradeDeadline] Demande de déblocage approuvée trouvée, autorisation');
                // Autoriser la saisie car demande approuvée
                return next();
            } else {
                console.log('ℹ️ [checkGradeDeadline] Aucune demande de déblocage approuvée');
            }
        }

        // Récupérer la configuration académique
        const configSetting = await Setting.findOne({ key: 'academic_year_config' });

        console.log('📋 [checkGradeDeadline] Configuration trouvée:', configSetting ? 'OUI' : 'NON');

        if (!configSetting || !configSetting.value || !configSetting.value.gradeDeadlines) {
            console.log('⚠️ [checkGradeDeadline] Pas de configuration de deadline, autorisation par défaut');
            // Pas de configuration de deadline, autoriser la saisie
            return next();
        }

        const deadlines = configSetting.value.gradeDeadlines;
        console.log('📅 [checkGradeDeadline] Deadlines configurées:', JSON.stringify(deadlines, null, 2));

        // Déterminer quelle période est concernée (T1, T2, T3, S1, S2)
        let periodKey;
        if (periode.includes('1') || periode === 'Trimestre 1' || periode === 'Semestre 1') {
            periodKey = 'period1';
        } else if (periode.includes('2') || periode === 'Trimestre 2' || periode === 'Semestre 2') {
            periodKey = 'period2';
        } else if (periode.includes('3') || periode === 'Trimestre 3') {
            periodKey = 'period3';
        } else {
            console.log('⚠️ [checkGradeDeadline] Période non reconnue:', periode);
            // Période non reconnue, autoriser
            return next();
        }

        console.log('🔑 [checkGradeDeadline] Clé de période déterminée:', periodKey);

        // Vérifier si la période est verrouillée
        const isLocked = deadlines[`${periodKey}Locked`];
        console.log('🔒 [checkGradeDeadline] Verrouillage manuel:', isLocked);

        if (isLocked) {
            console.log('❌ [checkGradeDeadline] BLOQUÉ - Période verrouillée manuellement');
            return res.status(403).json({
                success: false,
                error: `La saisie des notes est verrouillée pour ${periode}. Vous pouvez demander un déblocage au censeur.`
            });
        }

        // Vérifier la date limite
        const deadline = deadlines[periodKey];
        console.log('📆 [checkGradeDeadline] Date limite configurée:', deadline);

        if (deadline) {
            const deadlineDate = new Date(deadline);
            const now = new Date();

            console.log('⏰ [checkGradeDeadline] Comparaison:', {
                deadline: deadlineDate.toISOString(),
                now: now.toISOString(),
                isExpired: now > deadlineDate
            });

            if (now > deadlineDate) {
                console.log('❌ [checkGradeDeadline] BLOQUÉ - Date limite dépassée');
                return res.status(403).json({
                    success: false,
                    error: `La date limite de saisie pour ${periode} est dépassée (${deadlineDate.toLocaleDateString('fr-FR')}). Vous pouvez demander un déblocage au censeur.`
                });
            }
        }

        // Tout est OK, continuer
        console.log('✅ [checkGradeDeadline] Autorisation accordée');
        next();
    } catch (error) {
        console.error('💥 [checkGradeDeadline] Erreur:', error);
        // En cas d'erreur, autoriser la saisie pour ne pas bloquer le système
        next();
    }
};
