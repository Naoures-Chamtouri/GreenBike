
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";

function CartAlert() {
  return (
    <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
      Produit ajouté au panier !
    </Alert>
  );
}
export default CartAlert;
