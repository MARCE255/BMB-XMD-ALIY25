const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNEl1Z3oxM3VOc0xNcHNDYjRSRkxLa0NmOEI1bkM0L1V6dXRyR0RNQnlFWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSzdNUWVEYkJJYkYvRG1iNHdoVS9jYmoyQ2hwaUlJNXVsZXQzMHFYb2YwOD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJRR3FYdVZheFJ6eVJtcFBsTkhhMHVtbHFLdnRCdmJxbnpacE55MzFtdFZVPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIwQjdicFZWRTBZUituT0JQbStaOFFCa1dtTEQwQ25xR1FBbDl3cWxlZW1VPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IldCZlloZkQzcmpNalczbjRkK0ZXT2IrYmpvYVdKdVpMOXUzZHpqSTVNVk09In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImZHbjhKbjRLMmx1MWRHVVI4MUl5QjUxaFQxRDN5cVYxdm1KYXpwMitjRlU9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidUtlVFJFVlNyakpNRVdCZys2V2x1dlE1dHIxZjI1Mk1JblpTallTdTNYVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoid3JlYSszbytJaG41R0ZucjNjN1NVMG5sc0phUko0c3BFbE9OWVRLS25XZz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkttMW5CUU53RnVYZ3JpM083bnJSaEJWSnVmNG0rVHQxUlRPQnpJZldDNEEreEtSLzRlbEg5aXdrekliL2JkNGhMQUdLZ3dDK0FkRXJ5bFR5dUVRaWlRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjQ5LCJhZHZTZWNyZXRLZXkiOiIzVWUrOGptWXp5dEhLNjJRVFV6T24zbWoxTU03VFdsY2k2Q0RXL0ZrTWg4PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjI1NTYyMDc4MDQyNUBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiJBQTIwNjY5ODkwMjE2NzQxRUFERkY1NDlBQ0ZDOTYwNCJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzUxOTYxNzMxfSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyNTU2MjA3ODA0MjVAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiRUFBOTQ0NzEzNjA1ODk4RTZBRDhFQjM0MzBEQ0EwMjEifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc1MTk2MTczMn1dLCJuZXh0UHJlS2V5SWQiOjYxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6NjEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sInJlZ2lzdGVyZWQiOnRydWUsInBhaXJpbmdDb2RlIjoiNFk3S1o2M0ciLCJtZSI6eyJpZCI6IjI1NTYyMDc4MDQyNToxQHMud2hhdHNhcHAubmV0IiwibGlkIjoiMjM1ODMyOTYzMjU2NTU1OjFAbGlkIiwibmFtZSI6ImFiZGFyYXp1bCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTmFBcDhNQ0VPMmdzOE1HR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiQjVtd2dJVlQrTGRTdTgvS013N0g3WXFQL0tmMENNa1pWalFZOTRVN2x4dz0iLCJhY2NvdW50U2lnbmF0dXJlIjoiNWs5MzdlRXZvSTM3L0lBRkpTdmtCa2ZjbFBCSU9nOURCczZhZldMR1hFQVJocEM3aHRpeGh3dFZaTkNDMlpkRnk3SXZFMkE5dk9iemRYdVVURzBQQ0E9PSIsImRldmljZVNpZ25hdHVyZSI6Ijlud0lGUjNVU1lYK2FaQzdvUjYxMkpzL1hkNDNraUV1N0xWWE45Q29LVXlDMzg1bnNUTEkzY1dMOFMyN1Z4YXF4d3ZHcUNNS0VXZVJDSGY4WUVkbmh3PT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjU1NjIwNzgwNDI1OjFAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCUWVac0lDRlUvaTNVcnZQeWpNT3grMktqL3luOUFqSkdWWTBHUGVGTzVjYyJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0FJSURRPT0ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzUxOTYxNzIzLCJsYXN0UHJvcEhhc2giOiIyRzRBbXUiLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUJTMSJ9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Aliy Abdarazul 😈",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "255620780425",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'B.M.B-TECH',
    URL : process.env.BOT_MENU_LINKS || 'https://files.catbox.moe/hvi870.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '1' ,
    ETAT : process.env.PRESENCE || '',
    ANTICALL : process.env.ANTICALL || 'yes',   
    AUTO_BIO : process.env.AUTO_BIO || 'yes',               
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ANTIDELETE1 : process.env.ANTI_DELETE_MESSAGE || 'yes',
    AUTO_REACT : process.env.AUTO_REACT || 'no',
    AUTO_REACT : process.env.AUTO_REACT || 'no',              
    AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
    AUTO_READ : process.env.AUTO_READ || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

