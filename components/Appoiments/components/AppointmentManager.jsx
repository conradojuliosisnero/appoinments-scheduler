import { useState } from "react";
import { UserPlus, Pencil, Trash2 } from "lucide-react";
import {
  Modal,
  Form,
  Input,
  Button,
  Typography,
  List,
  Avatar,
  message,
} from "antd";
import DashboardNav from "@/commons/DashboardNav";
import styles from "@/commons/home.module.css";
import appoinments from '../styles/appoinments.module.css'

const { Title } = Typography;

export default function Home() {
  const [usuarios, setUsuarios] = useState([
    { id: 1, nombre: "Juan Pérez", correo: "juan@example.com" },
    { id: 2, nombre: "Ana García", correo: "ana@example.com" },
    { id: 3, nombre: "Miguel López", correo: "miguel@example.com" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [form] = Form.useForm();

  const handleOpenModal = (usuario = null) => {
    setCurrentUser(usuario);
    form.setFieldsValue(usuario || { nombre: "", correo: "" });
    setIsModalOpen(true);
  };

  const handleSave = () => {
    form.validateFields().then((values) => {
      if (currentUser) {
        setUsuarios((prev) =>
          prev.map((user) =>
            user.id === currentUser.id ? { ...user, ...values } : user
          )
        );
        message.success("Usuario actualizado");
      } else {
        setUsuarios((prev) => [...prev, { id: prev.length + 1, ...values }]);
        message.success("Usuario creado");
      }
      setIsModalOpen(false);
      setCurrentUser(null);
    });
  };

  const handleDelete = (id) => {
    setUsuarios((prev) => prev.filter((user) => user.id !== id));
    message.success("Usuario eliminado");
  };

  return (
    <main className={styles.main}>
      <DashboardNav />

      <div className={appoinments.container}>
        <header
        className={appoinments.header}
        >
          <Title level={2}>Gestión de Usuarios</Title>
          <Button
            type="primary"
            icon={<UserPlus />}
            onClick={() => handleOpenModal()}
          >
            Añadir Usuario
          </Button>
        </header>
        <List
          dataSource={usuarios}
          renderItem={(usuario) => (
            <List.Item
              actions={[
                <Button
                  icon={<Pencil />}
                  onClick={() => handleOpenModal(usuario)}
                  key="edit"
                >
                  Editar
                </Button>,
                <Button
                  danger
                  icon={<Trash2 />}
                  onClick={() => handleDelete(usuario.id)}
                  key="delete"
                >
                  Eliminar
                </Button>,
              ]}
            >
              <List.Item.Meta
                avatar={
                  <Avatar>{usuario.nombre.charAt(0).toUpperCase()}</Avatar>
                }
                title={usuario.nombre}
                description={usuario.correo}
              />
            </List.Item>
          )}
        />
        <Modal
          title={currentUser ? "Editar Usuario" : "Añadir Usuario"}
          open={isModalOpen}
          onOk={handleSave}
          onCancel={() => setIsModalOpen(false)}
          okText="Guardar"
          cancelText="Cancelar"
        >
          <Form form={form} layout="vertical">
            <Form.Item
              name="nombre"
              label="Nombre"
              rules={[
                { required: true, message: "Por favor ingresa el nombre" },
              ]}
            >
              <Input placeholder="Nombre del usuario" />
            </Form.Item>
            <Form.Item
              name="correo"
              label="Correo Electrónico"
              rules={[
                { required: true, message: "Por favor ingresa el correo" },
                { type: "email", message: "Correo no válido" },
              ]}
            >
              <Input placeholder="Correo electrónico" />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </main>
  );
}
