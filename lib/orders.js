import mysql from 'mysql2/promise';

export async function writeOrder(order) {
  // create the connection to database
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'test',
    password: "Fm8349jCX0348JM-DfjHJ"
  });

  const orderFields = Object.keys(order);
  await longInsertIntoStatement(connection, orderFields);
  await connection.commit();
  connection.release();
}

export async function readOrder(orderId) {
  try {
    // create the connection to database
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      database: 'test',
      password: "Fm8349jCX0348JM-DfjHJ"
    });

    const orderRow = await mysql.createConnection('SELECT * FROM Orders WHERE orderId = :orderId', { orderId });
    const order = {
      orderId: orderRow[0].orderId,
      orderDeliveryDate: orderRow[0].orderDeliveryDate,
      orderPrice: orderRow[0].orderPrice,
      customerId: orderRow[0].customerId,
    };
    await connection.commit();
    connection.release();
    return order;
  } catch (error) {}
}

export async function calculateTax(orderId) {
  try {
    // create the connection to database
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      database: 'test',
      password: "Fm8349jCX0348JM-DfjHJ"
    });

    const orderRow = await mysql.createConnection('SELECT * FROM Orders WHERE orderId = :orderId', { orderId });
    const keys = Object.keys(orderRow[0]);
    let taxTotal = 0;
    keys.forEach((field) => {
      if (field === 'orderSalesTax') {
        taxTotal = taxTotal + orderRow[0][field];
      } else if (field === 'orderStateTax') {
        taxTotal = taxTotal + orderRow[0][field];
      } else if (field === 'orderFederalTax') {
        taxTotal = taxtoTal + orderRow[0][field];
      } else if (field === 'orderCaliTax') {
        taxTotal = taxtoTal + orderRow[0][field];
      }
    });

    await connection.commit();
    connection.release();
    return taxTotal;
  } catch (error) {}
}
