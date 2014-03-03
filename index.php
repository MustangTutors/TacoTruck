<?php 
    include "init.php";

?>
<!DOCTYPE html>

<html lang="en">

<head>
    <title>Taco Truck</title>
    <meta charset="UTF-8">
    <link rel="stylesheet" type="text/css" href="css/style.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
    <script type="text/javascript" src="js/includes.js"></script>
    <script type="text/javascript" src="js/order.js"></script>
    <script type="text/javascript" src="js/login.js"></script>

</head>

<body>
    <header></header>

    <main>
        <section id="createTaco">
            <h2 class="heading">Create a Taco</h2>
            <article id="tortillaSelection">
                <h3>Choose a Tortilla</h3>
                <div class="pictureView">
                    <div class='holder'></div>
                </div>
            </article>

            <article id="fillingSelection">
                <h3>Choose a Filling</h3>
                <div class="pictureView">
                    <div class='holder'></div>
                </div>
            </article>

            <article class="floating" id="riceSelection">
                <h3>Choose a Rice</h3>
                <img src="img/none.png" class="toppingPic" alt="rice">
                <select class="dropdown">
                    <option value="none" price="0">None</option>
                </select>
            </article>

            <article class="floating" id="beanSelection">
                <h3>Choose Beans</h3>
                <img src="img/none.png" class="toppingPic" alt="beans">
                <select class="dropdown">
                    <option value="none" price="0">None</option>
                </select>
            </article>

            <article class="floating" id="cheeseSelection">
                <h3>Choose a Cheese</h3>
                <img src="img/none.png" class="toppingPic" alt="cheese">
                <select class="dropdown">
                    <option value="none" price="0">None</option>
                </select>
            </article>

            <article class="floating" id="sauceSelection">
                <h3>Choose a Sauce</h3>
                <img src="img/none.png" class="toppingPic" alt="sauce">
                <select class="dropdown">
                    <option value="none" price="0">None</option>
                </select>
            </article>

            <article class="floating" id="vegetableSelection">
                <h3>Select Vegetables:</h3>
                <div class="center">
                    <button class="button" id="selectAllVegetables">Select All</button>
                </div>
            </article>

            <article class="floating" id="extraSelection">
                <h3>Select Extras:</h3>
                <div class="center">
                    <button class="button" id="selectAllExtras">Select All</button>
                </div>
            </article>

            <article id="quantitySelection">
                <span class="subtitle">Select Quantity:</span>
                <input type="number" value="1" min="1" max="100" name="quantity">
            </article>

            <div id="price">
                <article id="indivPrice">
                    <span class="subtitle">Price/Taco:</span>
                    <span class="price">$1.25</span>
                </article>

                <article id="totalPrice">
                    <span class="subtitle">Total Price:</span>
                    <span class="price">$1.25</span>
                </article>
            </div>

            <div class="holder"></div>
            <div class="center">
                <button class="button" id="cancelTaco">Cancel Taco</button>
                <button class="button" id="addToOrder">Add to Order</button>
            </div>
        </section>

        <section id="orders">
            <h2 class="heading">Your Order</h2>

            <article id="previousOrder">
                <h3>Previous Order</h3>

                <div class="center">
                    <input type="checkbox" name="useLastOrder" id="useLastOrder">
                    <label for="useLastOrder">Add to Order</label>
                </div>
            </article>

            <article id="currentOrder">
            </article>

            <div class="center">
                <article id="totalOrderPrice">
                    <span class="subtitle">Total price for 0 tacos:</span>
                    <span class="price">$0.00</span>
                </article>

                <button class="button" id="cancelOrder">Cancel</button>
                <button class="button" id="submitOrder">Pay</button>
            </div>
        </section>
        <section class="holder"></section>

        <section id="payment">
            <div id="paymentBox">
                <div id="paymentForm">
                    <h2 class="heading">Payment</h2>
                    <form>
                        <div id="paymentWindowPrice"></div>
                        <div>
                            <label for="first_name">First Name: *</label>
                            <input type="text" name="first_name" id="payment_first" placeholder="Enter First Name" required>
                        </div>
                        <div>
                            <label for="last_name">Last Name: *</label>
                            <input type="text" name="last_name" id="payment_last" placeholder="Enter Last Name" required>
                        </div>
                        <div>
                            <label for="credit_provider">Credit Card Provider: *</label>
                            <select name="credit_provider" id="payment_provider">
                                <option value="Visa">Visa</option>
                                <option value="Mastercard">Mastercard</option>
                                <option value="American Express">American Express</option>
                            </select>
                        </div>
                        <div>
                            <label for="credit_number">Credit Card Number: *</label>
                            <input type="text" name="credit_number" id="payment_number" placeholder="Enter Credit Card Number" pattern="^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$" title="Must be valid, 16 digit credit card number. Ex: 1234567812345678" required>
                        </div>
                        <div class="center">
                            <button class="button close" id="cancelPayment">Cancel</button>
                            <input type="submit" class="button" id="submitPayment" value="Pay">
                        </div>
                    </form>
                </div>
                <div id="proceedToLocation">
                    <h2 class="heading">Thank you for ordering!</h2>
                    <span>Any Taco Truck location will have your tacos prepared.</span><br/><br/>
                    <button class="button close" id="closeWindow">Close</button>
                    <a href="findLocation.html" class="button" id="findLocation">Find Location!</a>
                </div>
            </div>
        </section>
    </main>

    <footer>
    </footer>
</body>

</html>