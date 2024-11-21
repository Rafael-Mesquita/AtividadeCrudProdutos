const express = require("express")
const router = express.Router()
const Produto = require("../models/produto")


router.post("/", async (req, res) => {
    const dados = req.body

    try{
        const novoProduto = new Produto(dados)
        const produtoSalvo = await novoProduto.save()

        res.status(201).send(produtoSalvo)
    }catch(err){
        res.status(500).send({ mensagem: "Erro ao criar produto"})
    }
})

router.delete("/:id", async (req, res) => {
    try{
        const {id} = req.params
        const produtoExcluido = await Produto.findByIdAndDelete(id)
        if(!produtoExcluido){
            return res.status(404).send("Produto não encontrado")
        }

        res.send("Produto deletado com sucesso")
    }catch(err){
        res.status(500).send({ mensagem: "Erro ao deletar produto"})
    }
})

router.get("/produtos", async (req, res) => {
    try {
        const produtos = await Produto.find();
        res.status(200).json(produtos);
    } catch (err) {
        res.status(500).json({ erro: "Erro ao buscar produtos." });
    }
});

router.get("/produtos/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const produto = await Produto.findById(id);
        if (!produto) {
            return res.status(404).json({ erro: "Produto não encontrado." });
        }
        res.status(200).json(produto);
    } catch (err) {
        res.status(500).json({ erro: "Erro ao buscar produto." });
    }
});

router.put("/produtos/:id", async (req, res) => {
    const { id } = req.params;
    const dadosAtualizados = req.body;

    try {
        const produto = await Produto.findByIdAndUpdate(id, dadosAtualizados, {
            new: true, 
            runValidators: true, 
        });

        if (!produto) {
            return res.status(404).json({ erro: "Produto não encontrado." });
        }

        res.status(200).json(produto);
    } catch (err) {
        res.status(500).json({ erro: "Erro ao atualizar produto." });
    }
});

module.exports = router