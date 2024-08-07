import { useContext, useEffect, useState } from "react";
import { WixClientContext } from "../context/WixContext";
import Seo from "../layout/Seo";
import moment from "moment";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { wixClient, currentUser } = useContext(WixClientContext);
  const [orders, setOrders] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [pending, setPending] = useState(false);
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    username: "",
    firstName: "",
    lastName: "",
    phone: "",
  });

  function handleChange(e) {
    const { value, name } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  }
  useEffect(() => {
    if (!wixClient) return;
    async function searchOrders() {
      const response = await wixClient.orders.searchOrders({
        search: {
          filter: { "buyerInfo.contactId": { $eq: currentUser?.contactId } },
        },
      });
      setOrders(response);
      setIsLoading(false);
    }
    searchOrders();
  }, [currentUser, wixClient]);
  function combineProductNames(lineItems) {
    return lineItems.map((item) => item.productName.translated).join(", ");
  }
  if (isLoading) {
    return (
      <div className="w-full flex gap-24 h-[calc(100vh-180px)] p-2">
        <div className="w-full md:w-1/2 h-full skeleton"></div>
        <div className="w-full md:w-1/2 hidden md:block h-full skeleton"></div>
      </div>
    );
  }
  async function updateUser(e) {
    e.preventDefault();
    setPending(true);
    try {
      await wixClient.members.updateMember(currentUser?.contactId, {
        contact: {
          firstName: inputs.firstName || undefined,
          lastName: inputs.lastName || undefined,
          phones: inputs.phone ? [inputs.phone] : undefined,
        },
        profile: {
          nickname: inputs.username || undefined,
        },
      });
    } catch (error) {
      console.log(error);
    } finally {
      setPending(false);
    }
  }
  return (
    <div className="flex flex-col md:flex-row gap-24 md:items-start items-center p-4">
      <Seo
        title={"Profile"}
        description={`Get to see your profile and orders`}
      />
      <div className="w-full md:w-1/2">
        <form className="p-2" onSubmit={updateUser}>
          <label className="form-control w-full max-w-lg">
            <div className="label">
              <span className="label-text">Username</span>
            </div>
            <input
              type="text"
              name="username"
              onChange={handleChange}
              placeholder={currentUser?.profile?.nickname || "Vhiz"}
              className="input input-bordered w-full max-w-lg"
            />
          </label>
          <label className="form-control w-full max-w-lg">
            <div className="label">
              <span className="label-text">First Name</span>
            </div>
            <input
              type="text"
              name="firstName"
              onChange={handleChange}
              placeholder={currentUser?.contact?.firstName || "John"}
              className="input input-bordered w-full max-w-lg"
            />
          </label>
          <label className="form-control w-full max-w-lg">
            <div className="label">
              <span className="label-text">Last Name</span>
            </div>
            <input
              type="text"
              onChange={handleChange}
              name="lastName"
              placeholder={currentUser?.contact?.lastName || "Doe"}
              className="input input-bordered w-full max-w-lg"
            />
          </label>
          <label className="form-control w-full max-w-lg">
            <div className="label">
              <span className="label-text">Phone No</span>
            </div>
            <input
              type="tel"
              onChange={handleChange}
              name="phone"
              placeholder={
                (currentUser?.contact?.phones &&
                  currentUser?.contact?.phones[0]) ||
                "+234..........."
              }
              className="input input-bordered w-full max-w-lg"
            />
          </label>

          <button
            disabled={pending}
            className="btn w-full btn-primary max-w-lg mt-2"
          >
            {pending ? <div className="loading"></div> : "Update"}
          </button>
        </form>
      </div>
      <div className="w-full md:w-1/2">
        <h1 className="text-2xl">Orders</h1>
        <div className="overflow-x-auto mt-12">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Price</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.orders.map((order) => (
                <tr
                  key={order._id}
                  onClick={() => navigate(`/orders/${order._id}`)}
                >
                  <td>{order._id}</td>
                  <td>{combineProductNames(order?.lineItems)}</td>

                  <td>{order.priceSummary.subtotal.formattedAmount}</td>
                  {order._createdDate ? (
                    <td>{moment(order._createdDate).fromNow()}</td>
                  ) : (
                    "---"
                  )}
                  <td>{order.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
