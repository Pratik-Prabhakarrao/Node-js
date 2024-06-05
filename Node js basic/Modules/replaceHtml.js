module.exports = function replaceHtml(emplate, product){
    let output = emplate.replace('{{%IMAGE%}}', product.productImage);// first we are replacing the name of property with the db name  
    output = output.replace('{{%MODELNAME%}}', product.name);
    output = output.replace('{{%MODELNO%}}', product.modeName);
    output = output.replace('{{%NAME%}}', product.modelNumber);
    output = output.replace('{{%SIZE%}}', product.size);
    output = output.replace('{{%CAMERA%}}', product.camera);
    output = output.replace('{{%PRICE%}}', product.price);
    output = output.replace('{{%COLOR%}}', product.color);
    output = output.replace('{{%ID%}}', product.id);
    output = output.replace('{{%ROM%}}', product.ROM);
    output = output.replace('{{%DESC%}}', product.Description);

    return output
}