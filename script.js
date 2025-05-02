document.getElementById("calculate").addEventListener("click", calculateSubnet);
let exportPdf = document.getElementById("export");
exportPdf.addEventListener("click", exportToPdf);

var result = {
  subnetAddr : "",
  firstUsable : "",
  lastUsable : "",
  broadcast : "",
  nextSubnet: "",
  hosts : "",
}

function calculateSubnet() {
  const ipAddress = document.getElementById("ipAddress").value;
  const subnetMask = document.getElementById("subnetMask").value;

  if (!validateInputs(ipAddress, subnetMask)) {
    alert("Veuillez enter une addresse IP valide et un masque de sous-réseau");
    return;
  }

  // Convert IP to binary array
  const ipBinary = ipAddress.split(".").map((num) => parseInt(num));

  // Convert subnet mask to binary array
  let maskBinary;
  if (subnetMask.includes(".")) {
    maskBinary = subnetMask.split(".").map((num) => parseInt(num));
  } else {
    const cidr = parseInt(subnetMask.replace("/", ""));
    maskBinary = cidrToMask(cidr);
  }

  // Calculate subnet address
  const subnetAddr = ipBinary.map((octet, i) => octet & maskBinary[i]);

  // Calculate broadcast address
  const wildcardMask = maskBinary.map((octet) => 255 - octet);
  const broadcast = ipBinary.map((octet, i) => octet | wildcardMask[i]);

  // Calculate first and last usable addresses
  const firstUsable = [...subnetAddr];
  firstUsable[3] += 1;

  const lastUsable = [...broadcast];
  lastUsable[3] -= 1;

  // Calculate next subnet
  const nextSubnet = [...subnetAddr];
  const increment = Math.pow(2, Math.floor(Math.log2(256 - maskBinary[3])));
  nextSubnet[3] += increment;

  // Calculate number of hosts
  const hostBits =
    32 -
    maskBinary.reduce((acc, octet) => {
      return acc + (octet.toString(2).match(/1/g) || []).length;
    }, 0);
  const hosts = Math.pow(2, hostBits) - 2;

  result.subnetAddr = subnetAddr;
  result.firstUsable = firstUsable;
  result.lastUsable = lastUsable;
  result.broadcast = broadcast;
  result.nextSubnet = nextSubnet;
  result.hosts = hosts;

  // Update UI
  document.getElementById("subnetAddress").textContent = subnetAddr.join(".");
  document.getElementById("firstUsable").textContent = firstUsable.join(".");
  document.getElementById("lastUsable").textContent = lastUsable.join(".");
  document.getElementById("broadcast").textContent = broadcast.join(".");
  document.getElementById("nextSubnet").textContent = nextSubnet.join(".");
  document.getElementById("hosts").textContent = hosts;
  showDownloadBtn()
}

function exportToPdf(){
  console.log("exporting to pdf now ....");
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  
  
  // Creating a Centered Title
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  const title = "Rapport de Calcul de Sous-réseau";
  const pageWidth = doc.internal.pageSize.width;
  doc.text(title, pageWidth/2, 15, { align: "center" });

  // The table data from the json "result"
  const head = [['Nom', 'Resultat']];
  const data = [
    ['Adresse de sous reseau', result.subnetAddr.join(".")],
    ['Premiere adresse utilisable', result.firstUsable.join(".")],
    ['Derniere adresse utilisable', result.lastUsable.join(".")],
    ['Adresse de diffusion', result.broadcast.join(".")],
    ['Sous reseau suivant', result.nextSubnet.join(".")],
    ['Nombre d\'hotes disponibles', result.hosts],
  ];

  // Creating the table and parsing data
  doc.autoTable({
    head: head,
    body: data,
    startY: 30,
    theme: 'grid',
    styles: {
      fontSize: 10,
      cellPadding: 3,
    },
    headStyles: {
      fillColor: "#667eea",
      textColor: 255,
    },
  });

  // creating a simple footer
  doc.setFont("helvetica", "italic");
  doc.setFontSize(10);
  const today = new Date().toLocaleDateString();
  const footer = `Généré le ${today} depuis https://subnet-calculator-steel.vercel.app/`;
  doc.text(footer, pageWidth/2, doc.internal.pageSize.height - 10, { align: "center" });

  doc.save('Resultats du calcul.pdf');
}

function showDownloadBtn(){
  exportPdf.style.display = "block"
}

function cidrToMask(cidr) {
  const mask = new Array(4).fill(0);
  let fullOctets = Math.floor(cidr / 8);
  let remainingBits = cidr % 8;

  // Fill full octets
  for (let i = 0; i < fullOctets; i++) {
    mask[i] = 255;
  }

  // Fill partial octet
  if (remainingBits > 0) {
    mask[fullOctets] = 256 - Math.pow(2, 8 - remainingBits);
  }

  return mask;
}

function validateInputs(ip, mask) {
  const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
  const maskRegex = /^(\d{1,3}\.){3}\d{1,3}$|^\/\d{1,2}$/;

  if (!ipRegex.test(ip)) return false;
  if (!mask.includes("/") && !maskRegex.test(mask)) return false;

  const ipParts = ip.split(".").map((num) => parseInt(num));
  if (ipParts.some((num) => num < 0 || num > 255)) return false;

  if (mask.includes(".")) {
    const maskParts = mask.split(".").map((num) => parseInt(num));
    if (maskParts.some((num) => num < 0 || num > 255)) return false;
  } else {
    const cidr = parseInt(mask.replace("/", ""));
    if (cidr < 0 || cidr > 32) return false;
  }

  return true;
}

// *** Dark mode *** //
  
document.addEventListener('DOMContentLoaded', (event) => {
  const darkModeToggle = document.getElementById('darkModeToggle');
  const body = document.body;

  // *** Check for saved theme *** //
  const currentTheme = localStorage.getItem('theme') || 'light';
  body.classList.add(currentTheme);

  darkModeToggle.addEventListener('click', () => {
      body.classList.toggle('dark');
      body.classList.toggle('light');
      
      // *** Save theme preference on local storage *** //
      const theme = body.classList.contains('dark') ? 'dark' : 'light';
      localStorage.setItem('theme', theme);
  });
});
