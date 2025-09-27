from flask import Blueprint, jsonify, request
from models import db, Product

bp = Blueprint("products", __name__)

@bp.route("/api/products", methods=["GET"])
def get_products():
    products = Product.query.all()
    return jsonify([{
        "id": p.id,
        "name": p.name,
        "price": p.price,
        "quantity": p.quantity
    } for p in products])

@bp.route("/api/products/<int:product_id>", methods=["GET"])
def get_product(product_id):
    product = Product.query.get(product_id)
    if not product:
        return jsonify({"error": "Not Found"}), 404
    return jsonify({
        "id": product.id,
        "name": product.name,
        "price": product.price,
        "quantity": product.quantity
    })

@bp.route("/api/products", methods=["POST"])
def add_product():
    data = request.json
    product = Product(name=data["name"], price=data["price"], quantity=data["quantity"])
    db.session.add(product)
    db.session.commit()
    return jsonify({"message": "Product created", "id": product.id}), 201

@bp.route("/api/products/<int:product_id>", methods=["PUT"])
def update_product(product_id):
    product = Product.query.get(product_id)
    if not product:
        return jsonify({"error": "Not Found"}), 404
    data = request.json
    product.name = data.get("name", product.name)
    product.price = data.get("price", product.price)
    product.quantity = data.get("quantity", product.quantity)
    db.session.commit()
    return jsonify({"message": "Updated successfully"})

@bp.route("/api/products/<int:product_id>", methods=["DELETE"])
def delete_product(product_id):
    product = Product.query.get(product_id)
    if not product:
        return jsonify({"error": "Not Found"}), 404
    db.session.delete(product)
    db.session.commit()
    return jsonify({"message": "Deleted"}), 204
