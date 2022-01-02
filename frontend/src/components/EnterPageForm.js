import { enterConfig } from "../utils/utils";

export default function EnterPageForm(props) {
  return (
    <div className="enter">
      <div className={`page__container page__container_theme_${enterConfig.containerThemeEntrance}`}>
        <form name={props.name} className={`page__form page__form_theme_${enterConfig.containerThemeEntrance}`} onSubmit={props.onSubmit}>
          <h2 className={`page__form-title page__form-title_theme_${enterConfig.containerThemeEntrance}`}>{props.formTitle}</h2>
          {props.children && props.children.filter(child => !(child.props.className.includes('page__form-bottom-text')))}
          <button className={`page__form-submit-btn page__form-submit-btn_theme_${enterConfig.containerThemeEntrance} transparent transparent_amount_near-max`}
           type="submit">{props.submitButtonText}</button>
          {props.children && props.children.filter(child => child.props.className.includes('page__form-bottom-text'))}
        </form>
      </div>
    </div>
  );
}
