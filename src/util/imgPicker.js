import saveSvg from '../img/save.svg';
import unsaveSvg from '../img/unsave.svg';

export const loadUrl = "https://media.giphy.com/media/KG4PMQ0jyimywxNt8i/giphy.gif" 

export const loadingIcon = () =>  <img src={loadUrl} alt="myrecipe" width="220" height="220" style={{marginTop: '140px', opacity: '0.9'}}/>

export const saveIcon = () => <img src={saveSvg} alt="save icon"/>

export const unsaveIcon = () => <img src={unsaveSvg} alt="unsave icon"/>