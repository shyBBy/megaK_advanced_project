import React, {FormEvent, SyntheticEvent, useState} from "react";
import {Alert, Button, Card, Container, Form, Spinner} from "react-bootstrap";
import {geocode} from "../../utils/geocoding";
import {Link} from "react-router-dom";



export const CreateAddFormForm = () => {

    const [form, setForm] = useState({
        title: '',
        description: '',
        price: 0,
        url: '',
        address: '',
    });

    const [loading, setLoading] = useState<boolean>(false);
    const [id, setId] = useState('');


    const sendForm = async (e: SyntheticEvent) => {
        e.preventDefault();
        setLoading(true);


        try {

            const {lat, lon} = await geocode(form.address);


            const res = await fetch(`http://localhost:3002/ad`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...form,
                    lat,
                    lon,
                }),
            });
            const data = await res.json();
            setId(data.id)
        } finally {
            setLoading(false);
        }
    };

    const updateForm = (key: string, value: any) => {
        setForm(form => ({
            ...form,
            [key]: value,
        }));
    };

    if (loading) {
        return <>
            <Container style={{paddingTop: '5%', paddingLeft: '5%'}}>
                <Spinner animation="border" variant="primary" />
            </Container>
            </>
    }

    if (id) {
        return <>
            <Container style={{paddingTop: '5%', paddingLeft: '5%'}}>
                <Alert variant="success">
                    <Alert.Heading>Pomyślnie dodano ogłoszenie</Alert.Heading>
                    <p>
                        Twoje ogłoszenie zostało pomyślnie dodane ale jeszcze nie zostanie wyświetlone dopóki nie zostanie
                        zweryfikowane przez nasz dział moderacyjny. Proszę, poczekaj jeszcze trochę :)
                    </p>
                    <hr />
                    <p className="mb-0">
                        Id twojego ogłoszenia to: {id}
                        <br/>
                        {
                            <Link to='/'>Strona główna</Link>
                        }
                    </p>
                </Alert>
            </Container>
        </>
    }


    return (
        <>
            <Container style={{paddingTop: '5%', paddingLeft: '25%'}}>
                <Card style={{width: '27rem'}}>
                    <Card.Body>
                        <Card.Text>
                            <Form action="" onSubmit={sendForm}>
                                <Form.Group className="mb-4" controlId="formBasicEmail">
                                    <Form.Label>Title:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={form.title}
                                        required
                                        maxLength={99}
                                        placeholder="Podaj tytuł ogłoszenia"
                                        onChange={e => updateForm('title', e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-4" controlId="formBasicPassword">
                                    <Form.Label>Opis</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        type="text"
                                        placeholder="Opis"
                                        maxLength={999}
                                        value={form.description}
                                        onChange={e => updateForm('description', e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-4" controlId="formBasicPassword">
                                    <Form.Label>Cena</Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder="Podaj cene nieruchomosci"
                                        value={form.price}
                                        onChange={e => updateForm('price', e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-4" controlId="formBasicPassword">
                                    <Form.Label>Url</Form.Label>
                                    <Form.Control
                                        type="url"
                                        placeholder="url"
                                        value={form.url}
                                        onChange={e => updateForm('url', e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-4" controlId="formBasicPassword">
                                    <Form.Label>Adres</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Ulica nr, kod-pocztowy miejscowość"
                                        required
                                        value={form.address}
                                        onChange={e => updateForm('address', e.target.value)}
                                    />
                                </Form.Group>
                                    <Button type="submit" variant="primary">Dodaj</Button>
                            </Form>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Container>
        </>
    )
}