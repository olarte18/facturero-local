document.getElementById("invoiceForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = {
        cliente: formData.get("cliente"),
        telefono: formData.get("teléfono"),
        direccion: formData.get("Dirección"), 
        Nombredelproducto: formData.get("Nombre producto"),
        imei: formData.get("imei"),
        monto: formData.get("monto"),
    };

    const response = await fetch("http://localhost:3000/api/generar-factura", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "factura.pdf";
        a.click();
        window.URL.revokeObjectURL(url);
    } else {
        alert("Error al generar la factura.");
    }
});
