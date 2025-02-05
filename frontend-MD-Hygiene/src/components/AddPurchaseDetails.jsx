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
} from "../styles/AddPurchaseDetailsStyles";

export default function AddPurchaseDetails({
  addSaleModalSetting,
  products,
  handlePageUpdate,
  authContext,
}) {
  const [purchase, setPurchase] = useState({
    userID: authContext.user,
    productID: "",
    quantityPurchased: "",
    purchaseDate: "",
    totalPurchaseAmount: "",
  });

  const [open, setOpen] = useState(true);
  const cancelButtonRef = useRef(null);

  const handleInputChange = (key, value) => {
    setPurchase({ ...purchase, [key]: value });
  };

  const addSale = () => {
    fetch("http://localhost:4000/api/purchase/add", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(purchase),
    })
      .then((result) => {
        alert("Purchase ADDED");
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
              <ModalHeader>Purchase Details</ModalHeader>
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
                    <option>Select Products</option>
                    {products.map((element) => (
                      <option key={element._id} value={element._id}>
                        {element.name}
                      </option>
                    ))}
                  </Select>
                </InputGroup>

                <InputGroup>
                  <Label htmlFor="quantityPurchased">Quantity Purchased</Label>
                  <Input
                    type="number"
                    name="quantityPurchased"
                    id="quantityPurchased"
                    value={purchase.quantityPurchased}
                    onChange={(e) =>
                      handleInputChange(e.target.name, e.target.value)
                    }
                    placeholder="0 - 999"
                  />
                </InputGroup>

                <InputGroup>
                  <Label htmlFor="totalPurchaseAmount">
                    Total Purchase Amount
                  </Label>
                  <Input
                    type="number"
                    name="totalPurchaseAmount"
                    id="totalPurchaseAmount"
                    value={purchase.totalPurchaseAmount}
                    onChange={(e) =>
                      handleInputChange(e.target.name, e.target.value)
                    }
                    placeholder="$299"
                  />
                </InputGroup>

                <InputGroup>
                  <Label htmlFor="purchaseDate">Purchase Date</Label>
                  <Input
                    type="date"
                    id="purchaseDate"
                    name="purchaseDate"
                    value={purchase.purchaseDate}
                    onChange={(e) =>
                      handleInputChange(e.target.name, e.target.value)
                    }
                  />
                </InputGroup>

                <ButtonGroup>
                  <Button variant="primary" type="button" onClick={addSale}>
                    Add
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
