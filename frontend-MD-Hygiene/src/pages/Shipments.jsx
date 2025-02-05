import { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { FaTruck, FaPlusCircle } from "react-icons/fa"; // 🚛 İkonlar eklendi
import AuthContext from "../AuthContext";
import { API } from "../services/api";

import {
  ShipmentsContainer,
  TitleContainer,
  TitleIcon,
  TitleText,
  Table,
  TableHead,
  TableRow,
  TableData,
  InputContainer,
  Input,
  AddButton,
} from "../styles/ShipmentsStyles";

const Shipments = () => {
  const { user } = useContext(AuthContext);
  const [shipments, setShipments] = useState([]);
  const [newShipment, setNewShipment] = useState({
    order: "",
    trackingNumber: "",
    status: "Ausstehend", // ✅ Varsayılan durum: "Beklemede"
  });

  useEffect(() => {
    fetch(`${API.SHIPMENTS}`, {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setShipments(data))
      .catch((err) => console.error("❌ Fehler beim Laden der Sendungen:", err));
  }, [user]);

  const handleAddShipment = async () => {
    try {
      const res = await fetch(`${API.SHIPMENTS}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify(newShipment),
      });
      if (!res.ok) throw new Error("❌ Die Sendung konnte nicht hinzugefügt werden!");
      const data = await res.json();
      setShipments([...shipments, data]);
      setNewShipment({ order: "", trackingNumber: "", status: "Ausstehend" });
    } catch (err) {
      console.error("❌ Fehler beim Hinzufügen der Sendung:", err);
    }
  };

  return (
    <ShipmentsContainer>
      {/* 📌 Başlık Alanı */}
      <TitleContainer>
        <TitleIcon>
          <FaTruck />
        </TitleIcon>
        <TitleText>📦 Lieferungen</TitleText>
      </TitleContainer>

      {/* 📌 Kargo Ekleme Alanı */}
      <InputContainer>
        <Input
          type="text"
          placeholder="📌 Bestell-ID"
          value={newShipment.order}
          onChange={(e) => setNewShipment({ ...newShipment, order: e.target.value })}
        />
        <Input
          type="text"
          placeholder="🔢 Sendungsverfolgungsnummer"
          value={newShipment.trackingNumber}
          onChange={(e) =>
            setNewShipment({ ...newShipment, trackingNumber: e.target.value })
          }
        />
        <AddButton onClick={handleAddShipment}>
          <FaPlusCircle /> Hinzufügen
        </AddButton>
      </InputContainer>

      {/* 📌 Kargo Tablosu */}
      <Table>
        <thead>
          <tr>
            <TableHead>📌 Versand-ID</TableHead>
            <TableHead>🛒 Bestell-ID</TableHead>
            <TableHead>🔢 Sendungsverfolgung</TableHead>
            <TableHead>📍 Status</TableHead>
          </tr>
        </thead>
        <tbody>
          {shipments.map((shipment) => (
            <TableRow key={shipment._id}>
              <TableData>{shipment._id}</TableData>
              <TableData>{shipment.order}</TableData>
              <TableData>{shipment.trackingNumber}</TableData>
              <TableData>{shipment.status}</TableData>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </ShipmentsContainer>
  );
};

export default Shipments;
