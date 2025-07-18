const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post('/api/generar-factura', (req, res) => {
    const { cliente, telefono,direccion,Nombredelproducto, monto } = req.body;

    const doc = new PDFDocument({        size: [226, 600],  // 80mm de ancho
        margin: 10});
    const filename = `Factura_${Date.now()}.pdf`;
    const filepath = `./${filename}`;
    
    doc.pipe(fs.createWriteStream(filepath));
    doc.fontSize(25).text('Factura de Venta', { align:'left'  });
    doc.moveDown();
    doc.fontSize(12);
    doc.text(`Fecha: ${new Date().toLocaleDateString()}`);
    doc.moveDown();
    doc.text(`Cliente: ${cliente}`);
    doc.text(`Teléfono: ${telefono}`);
    doc.text(`Dirección: ${direccion}`);
    doc.text(`Producto: ${Nombredelproducto}`);
    doc.text(`Monto: $${monto}`);
    // Añadir información adicional hacer salto de línea
    doc.moveDown();
    doc.text('Emisor: Franklin Olarte - 3108098654',{ align: 'center' });
    doc.text('Gracias por su compra!', { align: 'center' });

    doc.end();

    doc.on('finish', () => {
        res.download(filepath, filename, (err) => {
            fs.unlinkSync(filepath);
        });
    });
});

app.listen(3000, () => {
    console.log('Servidor escuchando en http://localhost:3000');
});
