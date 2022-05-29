import React, {SyntheticEvent, useContext, useState} from "react";
import {Link} from "react-router-dom";
import {Container, Row, Col, Button} from "react-bootstrap";
import {SearchContext} from "../../contexts/search.context";
import {Btn} from "../common/Btn/Btn";

export const Header = () => {
    const {search, setSearch} = useContext(SearchContext);
    const [inputVal, setInputVal] = useState(search);

    const setSearchFromLocalState = (e: SyntheticEvent) => {
        e.preventDefault();
        setSearch(inputVal);
    };


    return (
            <div className="header">
                <Container>
                    <Row>

                        <Col><Link to="/"><Button>Mega Ogłoszenia</Button></Link></Col>
                        <Col></Col>
                        <Col>
                            <Link to="/add"><Button>Dodaj ogłoszenie</Button></Link>
                        </Col>
                        <Col></Col>
                        <Col>
                            <form className="search" onSubmit={setSearchFromLocalState}>
                                <input type="text" value={inputVal} onChange={e => setInputVal(e.target.value)}/> <Btn text="Szukaj"/>
                            </form>
                        </Col>
                    </Row>
                </Container>
            </div>

    );
}