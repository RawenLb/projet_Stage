import { Router } from "express";
const router = Router();

import * as controller from '../controller/controller.js';

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
        router.route('/feedback/stats')
      .get(controller.getRatingsStats);
      
router.route('/result')
        .get(controller.getResult)
        .post(controller.storeResult)
        .delete(controller.dropResult);

export default router;
