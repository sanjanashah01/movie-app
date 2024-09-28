import React, { useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import withRouter from "../../components/Common/withRouter";

// import Components
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";

//redux
import { useSelector, useDispatch } from "react-redux";

import {
  changeLayout,
  changeLayoutMode,
  changeSidebarTheme,
  changeSidebarType,
  changeTopbarTheme,
  changeLayoutWidth,
} from "../../store/actions";

import { createSelector } from "reselect";

const Layout = (props) => {
  const dispatch = useDispatch();

  const selectLayoutState = (state) => state.Layout;
  const selectLayoutProperties = createSelector(
    selectLayoutState,
    (layout) => ({
      layoutModeTypes: layout.layoutModeTypes,
      leftSideBarType: layout.leftSideBarType,
      layoutWidth: layout.layoutWidth,
      topbarTheme: layout.topbarTheme,
      leftSideBarTheme: layout.leftSideBarTheme,
    })
  );

  const {
    layoutModeTypes,
    layoutWidth,
    leftSideBarType,
    topbarTheme,
    leftSideBarTheme,
  } = useSelector(selectLayoutProperties);

  //hides right sidebar on body click
  const hideRightbar = useCallback(
    (event) => {
      var rightbar = document.getElementById("right-bar");
      //if clicked in inside right bar, then do nothing
      if (rightbar && rightbar.contains(event.target)) {
        return;
      }
    },
    [dispatch]
  );

  /*
  layout  settings
  */

  useEffect(() => {
    if (
      layoutModeTypes ||
      leftSideBarTheme ||
      layoutWidth ||
      leftSideBarType ||
      topbarTheme
    ) {
      window.dispatchEvent(new Event("resize"));
      dispatch(changeLayout("vertical"));
      dispatch(changeLayoutMode(layoutModeTypes));
      dispatch(changeSidebarTheme(leftSideBarTheme));
      dispatch(changeLayoutWidth(layoutWidth));
      dispatch(changeSidebarType(leftSideBarType));
      dispatch(changeTopbarTheme(topbarTheme));
    }
  }, [
    // layoutTypes,
    layoutModeTypes,
    leftSideBarTheme,
    layoutWidth,
    leftSideBarType,
    topbarTheme,
    dispatch,
  ]);

  useEffect(() => {
    //init body click event fot toggle rightbar
    document.body.addEventListener("click", hideRightbar, true);
  }, [hideRightbar]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <React.Fragment>
      <div id="layout-wrapper">
        <Header />
        <Sidebar theme={leftSideBarTheme} type={leftSideBarType} />
        <div className="main-content">{props.children}</div>
        <Footer />
      </div>
    </React.Fragment>
  );
};

Layout.propTypes = {
  changeLayoutWidth: PropTypes.func,
  changeLayoutMode: PropTypes.func,
  changeSidebarTheme: PropTypes.func,
  changeSidebarType: PropTypes.func,
  changeTopbarTheme: PropTypes.func,
  children: PropTypes.object,
  layoutWidth: PropTypes.any,
  leftSideBarTheme: PropTypes.any,
  leftSideBarType: PropTypes.any,
  location: PropTypes.object,
  topbarTheme: PropTypes.any,
};

export default withRouter(Layout);
