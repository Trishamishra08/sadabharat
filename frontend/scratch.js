const fs = require('fs');
const vendorFile = 'c:\\\\Users\\\\trish\\\\Desktop\\\\sadabharat_web\\\\frontend\\\\src\\\\components\\\\vendor\\\\VendorAddProduct.jsx';
const adminFile = 'c:\\\\Users\\\\trish\\\\Desktop\\\\sadabharat_web\\\\frontend\\\\src\\\\components\\\\admin\\\\AdminProducts.jsx';

let vendorCode = fs.readFileSync(vendorFile, 'utf8');
let adminCode = fs.readFileSync(adminFile, 'utf8');

const gridMatch = vendorCode.match(/<div className="grid grid-cols-1 lg:grid-cols-3 gap-4">[\s\S]*?<\/div>\s*<\/div>\s*\);/);
if (!gridMatch) { console.log('Could not find grid in vendor'); process.exit(1); }

let replacementGrid = gridMatch[0].replace('</div>\n    </div>\n  );', '</div>');

const stateVars = ['name', 'description', 'ingredients', 'benefits', 'dosage', 'disclaimer', 'hasVariants', 'variants', 'price', 'oldPrice', 'stock', 'sku', 'images', 'prescriptionRequired', 'noRefund', 'codAvailable', 'category', 'tags'];

stateVars.forEach(v => {
  if (v === 'images' || v === 'variants') return;
  replacementGrid = replacementGrid.replace(new RegExp('value={' + v + '}', 'g'), 'name="' + v + '" value={form.' + v + '} onChange={handleInputChange}');
  replacementGrid = replacementGrid.replace(new RegExp('checked={' + v + '}', 'g'), 'name="' + v + '" checked={form.' + v + '} onChange={handleInputChange}');
});

stateVars.forEach(v => {
  const capV = v.charAt(0).toUpperCase() + v.slice(1);
  replacementGrid = replacementGrid.replace(new RegExp('onChange={\\(e\\) => set' + capV + '\\(e\\.target\\.value\\)}', 'g'), '');
  replacementGrid = replacementGrid.replace(new RegExp('onChange={\\(e\\) => set' + capV + '\\(e\\.target\\.checked\\)}', 'g'), '');
});

replacementGrid = replacementGrid.replace(/variants/g, 'form.variants');
replacementGrid = replacementGrid.replace(/form\.form\.variants/g, 'form.variants');
replacementGrid = replacementGrid.replace(/hasVariants/g, 'form.hasVariants');
replacementGrid = replacementGrid.replace(/form\.form\.hasVariants/g, 'form.hasVariants');

replacementGrid = replacementGrid.replace(/images/g, 'form.images');
replacementGrid = replacementGrid.replace(/form\.form\.images/g, 'form.images');
replacementGrid = replacementGrid.replace(/handleFileChange/g, 'handleImageChange');

const adminStartStr = '<div className="grid grid-cols-1 lg:grid-cols-12 gap-5 font-sans">';
const adminStartIdx = adminCode.indexOf(adminStartStr);
const adminEndActual = adminCode.indexOf('</motion.div>', adminStartIdx);

const finalCode = adminCode.slice(0, adminStartIdx) + replacementGrid + '\n          ' + adminCode.slice(adminEndActual);
fs.writeFileSync(adminFile, finalCode);
console.log('Successfully replaced admin form UI');
