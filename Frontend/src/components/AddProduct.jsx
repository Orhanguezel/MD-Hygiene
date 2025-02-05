import { Fragment, useContext, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import AuthContext from "../AuthContext";
import {
  ModalOverlay,
  ModalContainer,
  ModalPanel,
  ModalHeader,
  InputGroup,
  Label,
  Input,
  TextArea,
  ButtonGroup,
  Button,
} from "../styles/AddProductStyles";

export default function AddProduct({
  addProductModalSetting,
  handlePageUpdate,
}) {
  const authContext = useContext(AuthContext);
  const [product, setProduct] = useState({
    userId: authContext.user,
    name: "",
    manufacturer: "",
    description: "",
  });

  const [open, setOpen] = useState(true);
  const cancelButtonRef = useRef(null);

  const handleInputChange = (key, value) => {
    setProduct({ ...product, [key]: value });
  };

  const addProduct = () => {
    fetch("http://localhost:4000/api/product/add", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(product),
    })
      .then((result) => {
        alert("Product ADDED");
        handlePageUpdate();
        addProductModalSetting();
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
              <ModalHeader>Add Product</ModalHeader>
              <form>
                <InputGroup>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    type="text"
                    name="name"
                    id="name"
                    value={product.name}
                    onChange={(e) =>
                      handleInputChange(e.target.name, e.target.value)
                    }
                    placeholder="Ex. Apple iMac 27”"
                  />
                </InputGroup>

                <InputGroup>
                  <Label htmlFor="manufacturer">Manufacturer</Label>
                  <Input
                    type="text"
                    name="manufacturer"
                    id="manufacturer"
                    value={product.manufacturer}
                    onChange={(e) =>
                      handleInputChange(e.target.name, e.target.value)
                    }
                    placeholder="Ex. Apple"
                  />
                </InputGroup>

                <InputGroup>
                  <Label htmlFor="description">Description</Label>
                  <TextArea
                    id="description"
                    rows="4"
                    name="description"
                    value={product.description}
                    onChange={(e) =>
                      handleInputChange(e.target.name, e.target.value)
                    }
                    placeholder="Write a description..."
                  />
                </InputGroup>

                <ButtonGroup>
                  <Button variant="primary" type="button" onClick={addProduct}>
                    Add Product
                  </Button>
                  <Button
                    type="button"
                    onClick={() => addProductModalSetting()}
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
