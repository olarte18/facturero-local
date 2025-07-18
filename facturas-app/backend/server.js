const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post('/api/generar-factura', (req, res) => {
    const { cliente, telefono,direccion,imei,Nombredelproducto, monto ,formaPago } = req.body;

    const doc = new PDFDocument({        size: [226, 430],  // 80mm de ancho
        margin: 10});
    const filename = `factura-${Date.now()}.pdf`;
    const filepath = `./facturas/${filename}`;
    
    
    doc.pipe(fs.createWriteStream(filepath));
    doc.font('Helvetica-Bold').fontSize(9);
   doc.moveTo(10, doc.y).lineTo(216, doc.y).dash(1, { space: 2 }).stroke().undash();

    doc.moveDown();
    doc.text('Movilbox');
    doc.text('Nit 11037137706-6')
    doc.text('Franklin Olarte');
    doc.text('3108098654');
    doc.text('Calle 5 # 6-86');
    doc.moveDown();
   doc.moveTo(10, doc.y).lineTo(216, doc.y).dash(1, { space: 2 }).stroke().undash();
    doc.moveDown();
    doc.text('Fecha: ' + new Date().toLocaleDateString(),{ align: 'left' }) ;
    doc.moveDown();
   doc.moveTo(10, doc.y).lineTo(216, doc.y).dash(1, { space: 2 }).stroke().undash();
    doc.moveDown();
    doc.text(`Cliente: ${cliente}`);
    doc.text(`Teléfono: ${telefono}`);
    doc.text(`Dirección: ${direccion}`);
    doc.moveDown();

       doc.moveTo(10, doc.y).lineTo(216, doc.y).dash(1, { space: 2 }).stroke().undash();
       doc.moveDown();
    doc.text('DETALLE DE LA FACTURA', { align: 'center' });
    doc.moveDown();
       doc.moveTo(10, doc.y).lineTo(216, doc.y).dash(1, { space: 2 }).stroke().undash();
    doc.moveDown();
    doc.text(`Producto: ${Nombredelproducto}`);
    doc.text(`IMEI: ${imei}`);
    doc.text(`Monto: $${monto}`);
    doc.moveDown();
    doc.moveTo(10, doc.y).lineTo(216, doc.y).dash(1, { space: 2 }).stroke().undash();
 

    doc.moveDown();
    doc.text('FORMA DE PAGO',{align: 'center' });
    doc.moveDown();
   doc.moveTo(10, doc.y).lineTo(216, doc.y).dash(1, { space: 2 }).stroke().undash();

    doc.moveDown();
    doc.text(`Forma de Pago: ${formaPago}`);
    doc.text(`Total: $${monto}`);
    doc.moveDown();


    doc.moveTo(10, doc.y).lineTo(216, doc.y).dash(1, { space: 2 }).stroke().undash();

    doc.moveDown();
    doc.text('GRACIAS POR SU COMPRA!', { align: 'center' });
    doc.moveDown();
 
    doc.text('CONSERVE SU FACTURA PARA GARANTIA', { align: 'center' });
    doc.moveDown();
    doc.moveTo(10, doc.y).lineTo(216, doc.y).dash(1, { space: 2 }).stroke().undash();


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
