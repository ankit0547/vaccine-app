import React from "react";

const RBAC = (props) => {
  const { aclKey, userClaim, children } = props;
  if (!aclKey || aclKey === null || aclKey === "") {
    return { children };
  }
  const aclObject = userClaim?.access.find((i) => i.resource === aclKey);

  if (aclObject) {
    if (aclObject.permission === "ENABLED")
      return <div className=''>{children} </div>;
  }
  return null;
};

export default RBAC;
