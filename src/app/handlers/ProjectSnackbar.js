import { enqueueSnackbar } from 'notistack';
import i18n from 'src/locales/i18n';

export const projectSnackbar = (messsage, options) => {
  return enqueueSnackbar(i18n.t(`CODES.${messsage}`), options);
};
