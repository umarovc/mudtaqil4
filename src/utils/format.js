export function formatPrice(amount) {
  const safeAmount = Number.isFinite(amount) ? Math.max(0, Math.round(amount)) : 0;
  return `${safeAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} so'm`;
}

export function getInitials(fullName = "") {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "TB";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
}

export function getShortName(fullName = "") {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "Foydalanuvchi";
  if (parts.length === 1) return parts[0];
  return `${parts[0]} ${parts[1][0].toUpperCase()}.`;
}
