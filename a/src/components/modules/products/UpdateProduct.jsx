import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  ModalOverlay,
  ModalContainer,
  ModalPanel,
  ModalHeader,
  InputGroup,
  Label,
  Input,
  Textarea,
  ButtonGroup,
  Button,
} from "../../../styles/UpdateProductStyles";

export default function UpdateProduct({ updateProductData, updateModalSetting }) {
  const { _id, name, manufacturer, description } = updateProductData;
  const [product, setProduct] = useState({
    productID: _id,
    name: name,
    manufacturer: manufacturer,
    description: description,
  });
  const [open, setOpen] = useState(true);
  const cancelButtonRef = useRef(null);

  const handleInputChange = (key, value) => {
    setProduct({ ...product, [key]: value });
  };

  const updateProduct = () => {
    fetch("http://localhost:4000/api/product/update", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(product),
    })
      .then((result) => {
        alert("Product Updated");
        setOpen(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" initialFocus={cancelButtonRef} onClose={setOpen}>
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
              <ModalHeader>Update Product</ModalHeader>
              <form>
                <InputGroup>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    type="text"
                    name="name"
                    id="name"
                    value={product.name}
                    onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                    placeholder="Enter product name"
                  />
                </InputGroup>

                <InputGroup>
                  <Label htmlFor="manufacturer">Manufacturer</Label>
                  <Input
                    type="text"
                    name="manufacturer"
                    id="manufacturer"
                    value={product.manufacturer}
                    onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                    placeholder="Enter manufacturer"
                  />
                </InputGroup>

                <InputGroup>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    rows="4"
                    name="description"
                    value={product.description}
                    onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                    placeholder="Write a description..."
                  />
                </InputGroup>

                <ButtonGroup>
                  <Button variant="primary" type="button" onClick={updateProduct}>
                    Update Product
                  </Button>
                  <Button type="button" onClick={() => updateModalSetting()} ref={cancelButtonRef}>
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
