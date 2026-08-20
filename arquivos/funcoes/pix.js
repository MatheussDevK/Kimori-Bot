
const axios = require("axios");

const ACCESS_TOKEN = 'TOKEN-PIX';

async function criarPagamentoPix(valorCompra, descricao, idempotencyKey) {
const payment_data = {
transaction_amount: valorCompra,
description: descricao || 'Pagamento via PIX',
payment_method_id: "pix",
payer: {
email: "cliente@email.com",
first_name: "Cliente",
last_name: "Teste",
identification: {
type: "CPF",
number: "12345678909"
}
}
};

try {
const response = await axios.post(
'https://api.mercadopago.com/v1/payments',
payment_data,
{
headers: {
'Authorization': `Bearer ${ACCESS_TOKEN}`,
'Content-Type': 'application/json',
'X-Idempotency-Key': idempotencyKey
}
}
);

const pagamento = response.data;

return {
id: pagamento.id,
qr_code: pagamento.point_of_interaction.transaction_data.qr_code,
qr_code_base64: pagamento.point_of_interaction.transaction_data.qr_code_base64
};
} catch (error) {
console.error('Erro ao criar o pagamento:', error.response ? error.response.data : error.message);
throw new Error('Erro ao criar o pagamento');
}
}

async function verificarPix(id) {
try {
const response = await axios.get(
`https://api.mercadopago.com/v1/payments/${id}`,
{
headers: {
'Authorization': `Bearer ${ACCESS_TOKEN}`
}
}
);

const pagamento = response.data;

return {
status: pagamento.status,
status_detail: pagamento.status_detail
};
} catch (error) {
console.error('Erro ao verificar o status do pagamento:', error.response ? error.response.data : error.message);
throw new Error('Erro ao verificar o status do pagamento');
}
}

module.exports = { criarPagamentoPix, verificarPix };