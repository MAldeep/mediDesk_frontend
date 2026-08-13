interface FormErrorProps {
  error: string | undefined;
}
export default function FormError({ error }: FormErrorProps) {
  return <p>Error : {error}</p>;
}
