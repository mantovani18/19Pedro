const SPREADSHEET_ID = "1yDs_HNbiK4JmF7fViU4PAKZNaXdljdO-AHLuR1h4nP8";
const RESPONSES_SHEET_NAME = "Respostas";

function getOrCreateSheet_() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = ss.getSheetByName(RESPONSES_SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(RESPONSES_SHEET_NAME);
  }

  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      "Horario da resposta",
      "Nome",
      "Numero",
      "Mensagem",
    ]);
  }

  return sheet;
}

function doGet() {
  try {
    const sheet = getOrCreateSheet_();
    return ContentService
      .createTextOutput(
        JSON.stringify({
          success: true,
          message: "Web App online",
          planilha: sheet.getParent().getName(),
          aba: sheet.getName(),
        })
      )
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(
        JSON.stringify({
          success: false,
          message: error.message,
        })
      )
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doPost(e) {
  try {
    const sheet = getOrCreateSheet_();

    const data = {
      nome: e.parameter.nome || "",
      telefone: e.parameter.telefone || "",
      mensagem: e.parameter.mensagem || "",
    };

    const nextRow = sheet.getLastRow() + 1;
    sheet
      .getRange(nextRow, 1, 1, 4)
      .setValues([[new Date(), data.nome || "", data.telefone || "", data.mensagem || ""]]);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(
        JSON.stringify({
          success: false,
          message: error.message,
        })
      )
      .setMimeType(ContentService.MimeType.JSON);
  }
}
