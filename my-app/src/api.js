export const getUsers = async () => {
  try {
    const res = await fetch(`http://localhost:8000/get/users`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return res.json();
  } catch (err) {
    throw new Error("Error getting users!");
  }
};

export const createUser = async (user) => {
  return fetch(`http://localhost:8000/create/user`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const updateUser = async (userId, user) => {
  return fetch(`http://localhost:8000/update/user/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteUser = async (userId) => {
  return fetch(`http://localhost:8000/delete/user/${userId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const createRole = async (role) => {
  try {
    const res = await fetch("http://localhost:8000/create/role", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(role),
    });
  } catch (err) {
    throw new Error("Error creating role");
  }
};

export const updateRole = async (userId, role) => {
  try {
    const res = await fetch(`http://localhost:8000/update/role/${userId}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(role),
    });
    return res;
  } catch (err) {
    throw new Error("Error creating role");
  }
};

export const getRoles = async () => {
  try {
    const res = await fetch(`http://localhost:8000/get/roles`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return res.json();
  } catch (err) {
    throw new Error("Error getting roles!");
  }
};

export const getRole = async (roleId) => {
  try {
    const res = await fetch(`http://localhost:8000/role/${roleId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return res.json();
  } catch (err) {
    throw new Error("Error getting roles!");
  }
};

export const deleteRole = async (roleId) => {
  try {
    const res = await fetch(`http://localhost:8000/delete/role/${roleId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return res;
  } catch (err) {
    throw new Error("Error getting roles!");
  }
};

export const getUserById = async (userId) => {
  try {
    const res = await fetch(`http://localhost:8000/user/${userId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error(`Error fetching user: ${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    return data;
  } catch (err) {
    throw new Error(`Failed to fetch user data: ${err.message}`);
  }
};

export const signup = async (user) => {
  return fetch(`http://localhost:8000/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const signin = async (user) => {
  return fetch(`http://localhost:8000/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const authenticate = (data, next) => {
  if (typeof window != undefined) {
    localStorage.setItem("jwt", JSON.stringify(data));
    next();
  }
};

export const signout = (next) => {
  if (typeof window != undefined) {
    localStorage.removeItem("jwt");
    next();
    return fetch(`http://localhost:8000/signout`, {
      method: "GET",
    })
      .then((response) => {
        console.log("Sign out: ", response);
      })
      .catch((err) => console.log(err));
  }
};

export const isAuthenticated = () => {
  if (typeof window == undefined) {
    return false;
  } else {
    if (localStorage.getItem("jwt")) {
      return JSON.parse(localStorage.getItem("jwt"));
    } else {
      return false;
    }
  }
};
