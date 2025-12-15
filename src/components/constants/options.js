export const apiUrlCustom = "192.168.0.135:3001";

export function formatarData(dataISO) {
  const data = new Date(dataISO);

  const mes = String(data.getMonth() + 1).padStart(2, "0");
  const dia = String(data.getDate()).padStart(2, "0");
  const ano = data.getFullYear();

  return `${ano}-${mes}-${dia}`;
}

export function formatDateCredencial(d = new Date()) {
    return new Intl.DateTimeFormat("pt-BR", { dateStyle: "long" }).format(
      new Date(d)
    );
  }
