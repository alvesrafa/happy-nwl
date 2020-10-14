import * as Yup from 'yup';

export default {
  validatePostOrphanage: validateOrphanage(),
};

function validateOrphanage() {
  return Yup.object().shape({
    name: Yup.string().required('O nome do orfanato é obrigatório.'),
    latitude: Yup.number().required(),
    longitude: Yup.number().required(),
    about: Yup.string()
      .required('Este campo é obrigatório.')
      .max(300, 'Límite de 300 caracatéres'),
    instructions: Yup.string().required('Este campo é obrigatório.'),
    opening_hours: Yup.string().required('Este campo é obrigatório.'),
    open_on_weekends: Yup.boolean().required('Este campo é obrigatório.'),
    images: Yup.array(
      Yup.object().shape({
        path: Yup.string().required('Este campo é obrigatório'),
      })
    ),
  });
}
