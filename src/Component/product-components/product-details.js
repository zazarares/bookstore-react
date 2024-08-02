import React from 'react';
import { Container, Row, Col, Image, Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class ProductDetails extends React.Component {
    handleBack = () => {
        window.history.back();
    };

    render() {
        const book = JSON.parse(localStorage.getItem("currentBook"));
        console.log(book);
        return (
            <Container className="mt-5">
                <Row className="mb-4">
                    <Col xs={1}>
                        <Image
                            src="https://static.vecteezy.com/system/resources/thumbnails/002/205/875/small/backward-arrow-icon-free-vector.jpg"
                            alt="Back"
                            className="img-fluid"
                            onClick={this.handleBack}
                            style={{ cursor: 'pointer' }}
                        />
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col md={9}>
                        <Card className="border-0">
                            <Row noGutters>
                                <Col md={5}>
                                    <Image src={book.url} alt="Book Cover" className="img-fluid rounded-start w-100 h-100" />
                                </Col>
                                <Col md={7}>
                                    <Card.Body className="ml-4">
                                        <Card.Title as="h1">{book.name}</Card.Title>
                                        <Card.Text as="h4">
                                            <strong>Author:</strong> {book.author}
                                        </Card.Text>
                                        <Card.Text as="h4">
                                            <strong>Genre:</strong> {book.genre}
                                        </Card.Text>
                                        <Card.Text as="h4">
                                            <strong>Year:</strong> {book.year}
                                        </Card.Text>
                                        <Card.Text as="h4">
                                            <strong>Price:</strong> {book.price}$
                                        </Card.Text>
                                        <Button variant="success" className="mt-3">Add to cart</Button>
                                    </Card.Body>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default ProductDetails;
