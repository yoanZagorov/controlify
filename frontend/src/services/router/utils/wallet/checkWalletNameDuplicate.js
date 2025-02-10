import { getActiveWallets } from "@/services/firebase/db/wallet";
import { HTTP_STATUS_CODES } from "@/constants";
import { StatusCodeError } from "@/utils/errors";

export default async function checkWalletNameDuplicate(userId, name) {
  const activeWallets = await getActiveWallets(userId);
  const activeWalletsNames = activeWallets.map(wallet => wallet.name);

  if (activeWalletsNames.includes(name)) {
    throw new StatusCodeError("A wallet with this name already exists. Please try a different one", HTTP_STATUS_CODES.CONFLICT);
  }
}