/**
 *
 * @param {string} param
 * @returns {Promise<boolean>}
 */
export async function moduleOne(param) {
  try {
    console.log(param);
    return true;
  } catch (err) {
    return false;
  }
}
