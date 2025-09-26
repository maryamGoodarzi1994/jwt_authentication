import express from 'express';

import {
  create,
  inquiry,
  find,
  update,
  remove,
} from './controller.js';

const router = express.Router();

router.post('/', create);
router.get('/', inquiry);
router.get('/:id', find);
router.put('/:id', update);
router.delete('/:id', remove);

export default router;
