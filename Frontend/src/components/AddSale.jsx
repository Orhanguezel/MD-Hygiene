import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { PlusIcon } from "@heroicons/react/24/outline";
import {
  ModalOverlay,
  ModalContainer,
  ModalPanel,
  ModalHeader,
  InputGroup,
  Label,
  Input,
  Select,
  ButtonGroup,
  Button,
} from "../styles/AddSaleStyles";

export default function AddSale({
  addSaleModalSetting,
  products,
  stores,
  handlePageUpdate,
  authContext,
}) {
  const [sale, setSale] = useState({
    userID: authContext.user,
    productID: "",
    storeID: "",
    stockSold: "",
    saleDate: "",
    totalSaleAmount: "",
  });

  const [open, setOpen] = useState(true);
  const cancelButtonRef = useRef(null);

  const handleInputChange = (key, value) => {
    setSale({ ...sale, [key]: value });
  };

  const addSale = () => {
    fetch("http://localhost:4000/api/sales/add", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(sale),
    })
      .then((result) => {
        alert("Sale ADDED");
        handlePageUpdate();
        addSaleModalSetting();
      })
      .catch((err) => console.log(err));
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <ModalOverlay />
        <ModalContainer>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <ModalPanel>
              <ModalHeader>Add Sale</ModalHeader>
              <form>
                <InputGroup>
                  <Label htmlFor="productID">Product Name</Label>
                  <Select
                    id="productID"
                    name="productID"
                    onChange={(e) =>
                      handleInputChange(e.target.name, e.target.value)
                    }
                  >
                    <option>Select Product</option>
                    {products.map((element) => (
                      <option key={element._id} value={element._id}>
                        {element.name}
                      </option>
                    ))}
                  </Select>
                </InputGroup>

                <InputGroup>
                  <Label htmlFor="storeID">Store Name</Label>
                  <Select
                    id="storeID"
                    name="storeID"
                    onChange={(e) =>
                      handleInputChange(e.target.name, e.target.value)
                    }
                  >
                    <option>Select Store</option>
                    {stores.map((element) => (
                      <option key={element._id} value={element._id}>
                        {element.name}
                      </option>
                    ))}
                  </Select>
                </InputGroup>

                <InputGroup>
                  <Label htmlFor="stockSold">Stock Sold</Label>
                  <Input
                    type="number"
                    name="stockSold"
                    id="stockSold"
                    value={sale.stockSold}
                    onChange={(e) =>
                      handleInputChange(e.target.name, e.target.value)
                    }
                    placeholder="0 - 999"
                  />
                </InputGroup>

                <InputGroup>
                  <Label htmlFor="totalSaleAmount">Total Sale Amount</Label>
                  <Input
                    type="number"
                    name="totalSaleAmount"
                    id="totalSaleAmount"
                    value={sale.totalSaleAmount}
                    onChange={(e) =>
                      handleInputChange(e.target.name, e.target.value)
                    }
                    placeholder="$299"
                  />
                </InputGroup>

                <InputGroup>
                  <Label htmlFor="saleDate">Sale Date</Label>
                  <Input
                    type="date"
                    id="saleDate"
                    name="saleDate"
                    value={sale.saleDate}
                    onChange={(e) =>
                      handleInputChange(e.target.name, e.target.value)
                    }
                  />
                </InputGroup>

                <ButtonGroup>
                  <Button variant="primary" type="button" onClick={addSale}>
                    Add Sale
                  </Button>
                  <Button
                    type="button"
                    onClick={() => addSaleModalSetting()}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </Button>
                </ButtonGroup>
              </form>
            </ModalPanel>
          </Transition.Child>
        </ModalContainer>
      </Dialog>
    </Transition.Root>
  );
}
