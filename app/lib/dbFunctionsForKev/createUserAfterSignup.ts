import { supabase } from "../../api/supabase";

//should be used only after signup
export const createUserAfterSignup = async (
  userID: string,
  userEmail: string
) => {
  try {
    const { data, error } = await supabase
      .from("users")
      .insert([
        {
          user_id: userID,
          email: userEmail,
          latest_send_date: new Date(),
        },
      ])
      .select();

    if (error) {
      console.log(error);
      return;
    }

    console.log(`User data inserted into 'users'`, data);
  } catch (error) {
    throw error;
  }
};

// createUserAfterSignup(
//   "a6f21689-00f8-4fc1-aa50-2d958dcd40ed",
//   "gyorijonatan@gmail.com"
// );
