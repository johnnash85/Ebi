import React from "react";
import "./styles.css";
import { Link } from "react-router-dom";
import { supportedLocales, fallbackLocale } from "assets/lang/supportedLang";
import { setLocaleWithFallback } from "redux/actions/i18n";
import { connect } from "react-redux";
import { Translate } from "react-redux-i18n";

class DropDownLang extends React.Component {
    constructor() {
        super();

        this.state = {
            displayMenu: false
        };

        this.showDropdownMenu = this.showDropdownMenu.bind(this);
        this.hideDropdownMenu = this.hideDropdownMenu.bind(this);
    }

    showDropdownMenu(event) {
        event.preventDefault();
        this.setState({ displayMenu: true }, () => {
            document.addEventListener("click", this.hideDropdownMenu);
        });
    }

    hideDropdownMenu() {
        this.setState({ displayMenu: false }, () => {
            document.removeEventListener("click", this.hideDropdownMenu);
        });
    }

    handleLanguageLinkClick = (e, code) => {
        e.preventDefault();
        this.props.setLocaleWithFallback(code);
    };

    render() {
        return (
            <div className="dropdown">
                <div className="button" onClick={this.showDropdownMenu}>
                    <Translate value="lang" />
                </div>

                {this.state.displayMenu ? (
                    <ul>
                        {Object.keys(supportedLocales).map(code => {
                            return (
                                <Link
                                    className="nav-link"
                                    to="#"
                                    key={code}
                                    active={code === this.props.locale ? "true" : "false"}
                                    onClick={e => this.handleLanguageLinkClick(e, code)}
                                >
                                    <li className="nav-item">{supportedLocales[code]}</li>
                                </Link>
                            );
                        })}
                    </ul>
                ) : null}
            </div>
        );
    }
}
const mapStateToProps = state => ({ locale: state.i18n.locale });

const mapDispatchToProps = { setLocaleWithFallback };

export default connect(mapStateToProps, mapDispatchToProps)(DropDownLang);