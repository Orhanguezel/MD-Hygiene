import { Fragment, useRef, useState, useContext } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { PlusIcon } from "@heroicons/react/24/outline";
import UploadImage from "./UploadImage";
import AuthContext from "../AuthContext";
import {
  ModalOverlay,
  ModalContainer,
  ModalPanel,
  ModalHeader,
  InputGroup,
  Label,
  Input,
  Textarea,
  Select,
  ButtonGroup,
  Button,
} from "../styles/AddStoreStyles";

export default function AddStore() {
  const authContext = useContext(AuthContext);
  const [form, setForm] = useState({
    userId: authContext.user,
    name: "",
    category: "",
    address: "",
    city: "",
    image: "",
  });

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const [open, setOpen] = useState(true);
  const cancelButtonRef = useRef(null);

  const addProduct = () => {
    fetch("http://localhost:4000/api/store/add", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then((result) => {
        alert("STORE ADDED");
        setOpen(false);
      })
      .catch((err) => console.log(err));
  };

  const uploadImage = async (image) => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "inventoryapp");

    await fetch("https://api.cloudinary.com/v1_1/ddhayhptm/image/upload", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setForm({ ...form, image: data.url });
        alert("Store Image Successfully Uploaded");
      })
      .catch((error) => console.log(error));
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
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
              <ModalHeader>Store Information</ModalHeader>
              <form>
                <InputGroup>
                  <Label htmlFor="name">Name</Label>
                  <Input type="text" name="name" id="name" value={form.name} onChange={handleInputChange} placeholder="Enter Store Name" />
                </InputGroup>

                <InputGroup>
                  <Label htmlFor="city">City</Label>
                  <Input type="text" name="city" id="city" value={form.city} onChange={handleInputChange} placeholder="Enter City Name" />
                </InputGroup>

                <InputGroup>
                  <Label htmlFor="category">Category</Label>
                  <Select id="category" name="category" onChange={handleInputChange}>
                    <option>Select Category</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Groceries">Groceries</option>
                    <option value="Wholesale">Wholesale</option>
                    <option value="SuperMart">SuperMart</option>
                    <option value="Phones">Phones</option>
                  </Select>
                </InputGroup>

                <InputGroup>
                  <Label htmlFor="address">Address</Label>
                  <Textarea id="address" rows="5" name="address" value={form.address} onChange={handleInputChange} placeholder="Enter Store Address..." />
                </InputGroup>

                <InputGroup>
                  <UploadImage uploadImage={uploadImage} />
                </InputGroup>

                <ButtonGroup>
                  <Button variant="primary" type="button" onClick={addProduct}>
                    Add Store
                  </Button>
                  <Button type="button" onClick={() => setOpen(false)} ref={cancelButtonRef}>
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
