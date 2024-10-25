document.getElementById("calculate").addEventListener("click", calculateSubnet);

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

  // Update UI
  document.getElementById("subnetAddress").textContent = subnetAddr.join(".");
  document.getElementById("firstUsable").textContent = firstUsable.join(".");
  document.getElementById("lastUsable").textContent = lastUsable.join(".");
  document.getElementById("broadcast").textContent = broadcast.join(".");
  document.getElementById("nextSubnet").textContent = nextSubnet.join(".");
  document.getElementById("hosts").textContent = hosts;
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
