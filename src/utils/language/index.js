import { Locale } from '../../config/language';
import { lang } from '../../config/global';

function translator(key, unique) {
  if (key == null) {
    return '';
  }

  let langMap;

  if (unique == null) {
    langMap = Locale.findIndex(find => find.id === key);
  } else {
    langMap = Locale.findIndex(find => find.id === key && find.key === unique);
  }

  if (langMap >= 0 && Locale[langMap][lang()] !== undefined) {
    return Locale[langMap][lang()];
  }

  return key;
}

export default translator;