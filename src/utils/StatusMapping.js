const statusMapping = (status) => {
  switch (status) {
    case 'enroute-customer':
      return 'Enroute to customer';

    case 'arrived-customer':
      return 'Driporter Arrived';

    case 'enroute-airport':
      return 'Enroute Airport';

    case 'driporter_handshake_opsporter':
      return 'Driporter Handshake';

    case 'arrived-airport':
      return 'Arrived Airport';

    case 'customer_handshake_opsporter':
      return 'Customer Handshake';

    case 'payment-pending':
      return 'Payment Pending';

    case 'payment-done':
      return 'Payment Done';

    case 'on_job':
      return 'On Job';

    default: {
      if (status) {
        const s = status.charAt(0).toUpperCase() + status.substr(1);
        return s;
      }
    }
  }
};

export default statusMapping;
