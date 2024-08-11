import { Router } from "express";
const router = Router();

import * as controller from '../controller/controller.js';
router.route('/register')
.post(controller.registerUser) ;
router.route('/login')
  .post(controller.loginUser);

  router.route('/reset-password-request')
  .post(controller.requestPasswordReset);

router.route('/reset-password/:token')
  .post(controller.resetPassword);

router.route('/questions')
        .get(controller.getQuestions)
        .post(controller.insertQuestions)
        .delete(controller.dropQuestions);
        router.route('/questions/:id')
        .delete(controller.deleteQuestion);
        router.route('/questions/:id')
        .put(controller.editQuestion);
        
        router.route('/feedback')
        .post(controller.storeFeedback); 
      
    // Assurez-vous également que ce n'est pas en conflit avec une autre route
    
        router.route('/feedback/stats')
      .get(controller.getRatingsStats);
      
router.route('/result')
        .get(controller.getResult)
        .post(controller.storeResult);
        router.route('/result/:id')    // Utilisez :id pour spécifier un ID
        .delete(controller.deleteResult);   
       
router.route('/total-users')
.get(controller.getTotalUsers);
router.route('/total-questions')
.get(controller.getTotalQuestions);
export default router;