import { Transaction } from "@/types/finance";
import * as DocumentPicker from "expo-document-picker";
import { File, Paths } from "expo-file-system";
import * as Sharing from "expo-sharing";

const EXPORT_VERSION = 1;

interface ExportPayload {
  app: "vi-cua-toi";
  version: number;
  exportedAt: string;
  transactions: Transaction[];
}

/** Ghi toàn bộ giao dịch ra file JSON rồi mở share sheet để lưu/gửi file. */
export async function exportTransactionsToFile(
  transactions: Transaction[],
): Promise<void> {
  const payload: ExportPayload = {
    app: "vi-cua-toi",
    version: EXPORT_VERSION,
    exportedAt: new Date().toISOString(),
    transactions,
  };

  const fileName = `vi-cua-toi-${new Date().toISOString().slice(0, 10)}.json`;
  const file = new File(Paths.document, fileName);

  // overwrite: true để export lại trong cùng 1 ngày không bị lỗi "đã tồn tại"
  file.create({ overwrite: true });
  file.write(JSON.stringify(payload, null, 2));

  const canShare = await Sharing.isAvailableAsync();
  if (!canShare) {
    throw new Error("Thiết bị không hỗ trợ chia sẻ file.");
  }

  await Sharing.shareAsync(file.uri, {
    mimeType: "application/json",
    dialogTitle: "Xuất dữ liệu Ví của tôi",
    UTI: "public.json",
  });
}

/** Kiểm tra sơ bộ 1 object có đủ field hợp lệ của Transaction không. */
function isValidTransaction(t: unknown): t is Transaction {
  if (!t || typeof t !== "object") return false;
  const tx = t as Record<string, unknown>;
  return (
    typeof tx.id === "string" &&
    typeof tx.name === "string" &&
    typeof tx.amount === "number" &&
    (tx.type === "in" || tx.type === "out") &&
    (tx.source === "cash" || tx.source === "bank") &&
    typeof tx.categoryId === "string" &&
    typeof tx.date === "string"
  );
}

/**
 * Mở trình chọn file, đọc + validate JSON.
 * Trả về null nếu người dùng huỷ chọn file.
 * Ném lỗi nếu file sai định dạng.
 */
export async function pickAndParseImportFile(): Promise<Transaction[] | null> {
  const result = await DocumentPicker.getDocumentAsync({
    type: ["application/json", "text/*"],
    copyToCacheDirectory: true,
  });

  if (result.canceled) return null;

  const picked = result.assets[0];

  let raw: string;
  try {
    const response = await fetch(picked.uri);
    if (!response.ok) throw new Error("http-not-ok");
    raw = await response.text();
  } catch {
    throw new Error("Không đọc được file đã chọn. Thử chọn lại file khác.");
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    throw new Error("File không phải JSON hợp lệ.");
  }

  const data = parsed as { transactions?: unknown };
  if (!Array.isArray(data.transactions)) {
    throw new Error("File không đúng định dạng của Ví của tôi.");
  }

  const validTransactions = data.transactions.filter(isValidTransaction);
  if (validTransactions.length === 0) {
    throw new Error("Không tìm thấy giao dịch hợp lệ nào trong file.");
  }

  return validTransactions;
}
