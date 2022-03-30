/*
 * Created by zhangq on 2021/05/20
 * style
 */
import { ReactElement, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import className from "./style.scss";

const PageHeader = ({ logo, title }: PageHeaderProps): ReactElement => {
  const basic = `page-header`;
  const navigate = useNavigate();
  /** LifeCycle */
  useEffect(() => {
    // init
  }, []);

  /**
   * @method
   */
  const home = () => {
    navigate("/homepage");
  };
  /** render */
  return (
    <div className={className[basic]}>
      <div className={className[`${basic}-left`]}>
        <div className={className[`${basic}-left-logo`]} onClick={home}>
          <img src={logo} alt="" />
          {title && <span className={className["title"]}>{title}</span>}
        </div>
      </div>
      <div className={className[`${basic}-right`]}></div>
    </div>
  );
};

export interface PageHeaderProps {
  logo: string;
  title?: string;
}

export default PageHeader;
