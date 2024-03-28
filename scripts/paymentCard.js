window.onload = function () {
  const name = document.getElementById('name');
  const cardNumber = document.getElementById('cardNumber');
  const expirationDate = document.getElementById('expirationDate');
  const securityCode = document.getElementById('securityCode');
  // let cctype = null;

  //Mask the Credit Card Number Input
  var cardNumber_mask = new IMask(cardNumber, {
    mask: [
      {
        mask: '0000 0000 0000 0000',
        cardtype: 'Unknown',
      },
    ],
  });

  //Mask the Expiration Date
  var expirationDate_mask = new IMask(expirationDate, {
    mask: 'MM{/}YY',
    groups: {
      YY: new IMask.MaskedPattern.Group.Range([0, 99]),
      MM: new IMask.MaskedPattern.Group.Range([1, 12]),
    },
  });

  //Mask the security code
  var securityCode_mask = new IMask(securityCode, {
    mask: '0000',
  });

  // CREDIT CARD IMAGE JS
  document.querySelector('.preload').classList.remove('preload');
  document.querySelector('.creditCard').addEventListener('click', function () {
    if (this.classList.contains('flipped')) {
      this.classList.remove('flipped');
    } else {
      this.classList.add('flipped');
    }
  });

  //On Input Change Events
  name.addEventListener('input', function () {
    if (name.value.length == 0) {
      document.getElementById('svgname').innerHTML = 'John Doe';
      document.getElementById('svgnameback').innerHTML = 'John Doe';
    } else {
      document.getElementById('svgname').innerHTML = this.value;
      document.getElementById('svgnameback').innerHTML = this.value;
    }
  });

  cardNumber_mask.on('accept', function () {
    if (cardNumber_mask.value.length == 0) {
      document.getElementById('svgnumber').innerHTML = '0123 4567 8910 1112';
    } else {
      document.getElementById('svgnumber').innerHTML = cardNumber_mask.value;
    }
  });

  expirationDate_mask.on('accept', function () {
    if (expirationDate_mask.value.length == 0) {
      document.getElementById('svgexpire').innerHTML = '11/14';
    } else {
      document.getElementById('svgexpire').innerHTML = expirationDate_mask.value;
    }
  });

  securityCode_mask.on('accept', function () {
    if (securityCode_mask.value.length == 0) {
      document.getElementById('svgsecurity').innerHTML = '000';
    } else {
      document.getElementById('svgsecurity').innerHTML = securityCode_mask.value;
    }
  });

  //On Focus Events
  name.addEventListener('focus', function () {
    document.querySelector('.creditCard').classList.remove('flipped');
  });

  cardNumber.addEventListener('focus', function () {
    document.querySelector('.creditCard').classList.remove('flipped');
  });

  expirationDate.addEventListener('focus', function () {
    document.querySelector('.creditCard').classList.remove('flipped');
  });

  securityCode.addEventListener('focus', function () {
    document.querySelector('.creditCard').classList.add('flipped');
  });
};
