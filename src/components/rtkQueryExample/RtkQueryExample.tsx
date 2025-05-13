import React from "react";
import { userApi } from "src/store/api/userApi";

const RtkQueryExample = () => {
  const { data, isLoading } = userApi.useGetUsersQuery();

  if (isLoading) return <div>Loading.....</div>;

  return (
    <div>
      {data?.map((user) => {
        return (
          <div key={user.id}>
            <div>User: {user.name} </div>
            <div>Company: {user.company.name} </div>
            <hr />
          </div>
        );
      })}
    </div>
  );
};

export default RtkQueryExample;
