import {Router} from 'express'

const router =Router()

router.get('/', (req, res) => {
    res.send('get');
  });

router.post('/', (req, res) => {
    res.send('post');
  });  

  router.put('/', (req, res) => {
    res.send('put');
  });   

  router.patch('/', (req, res) => {
    res.send('patch');
  });   

  router.patch('/', (req, res) => {
    res.send('delete');
  });   

  export default router