export function getMobileNo(user: any): string {
  if (!user) return "";
  let mobile_no = user.mobile_no || user.mobile || user.user_id || "";
  if (mobile_no.includes("@")) {
    mobile_no = mobile_no.split("@")[0];
  }
  if (!mobile_no || mobile_no.length < 10) {
    const fallback = user.customer_id?.split('-')[1] || "";
    if (fallback && fallback.length >= 10) {
      mobile_no = fallback;
    }
  }
  return mobile_no;
}

export async function addToCartUtil(itemCode: string, quantity: number = 1): Promise<boolean> {
  try {
    const userStr = localStorage.getItem("gbru_user");
    if (!itemCode) {
      return false;
    }
    if (!userStr) {
      return false;
    }

    const user = JSON.parse(userStr);
    let mobile_no = getMobileNo(user);
    const api_key = user.key_details?.api_key || user.api_key;
    const api_secret = user.key_details?.api_secret || user.api_secret;

    if (!mobile_no && (!api_key || !api_secret)) {
      return false;
    }

    const items = [
      {
        item: itemCode,
        quantity: quantity,
        is_moq_applicable: 0,
      }
    ];

    const response = await fetch("/api/cart/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items,
        mobile_no,
        api_key,
        api_secret
      }),
    });

    const data = await response.json();
    if (response.ok && data?.message?.status && data?.message?.data) {
      // Save the returned cart to local storage so the cart page can display it
      localStorage.setItem("gbru_cart_items", JSON.stringify(data.message.data));
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}
